import React from "react";
import SearchBar from '../../../components/SearchBar';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component{
  static navigationOptions =  ({navigation}) => ({ //함수를 만들고 객체 형태로 리턴하고 싶으면 괄호로 감싸야한다
    headerTitle:(
      <SearchBar 
        value={navigation.getParam("term","")} 
        onChange={navigation.getParam("onChange",() => null)} 
        onSubmit={navigation.getParam("onSubmit",()=>null)} 
      />
    )  
  });
  //constructor는 클래스가 처음 만들어질 때 이전에 실행되는 함수
  constructor(props){
    super(props);
    const {navigation} = props;//props에서 navigation을 가져온다 screen이니까 props에 navigation이 전달된다.
    this.state ={
      term: "",
      shouldFetch: false
    };//state는 searchBar와 상호작용 하는데 사용
    navigation.setParams({
      term: this.state.term,
      onChange:this.onChange,
      onSubmit:this.onSubmit
    })
  }
  onChange = text => {
    const { navigation } = this.props;
    this.setState({term : text, shouldFetch:false});
    navigation.setParams({
      term: text
    });
  };
  onSubmit = () => {
    this.setState({shouldFetch:true});
  }
  render(){
    const {term, shouldFetch} = this.state;//this.state에서 shouldFetch와 term을 가져온다.
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
//상단 네비게이션을 바꾸는 법 
//1.TabNavigation의 Search stack에 헤더부분을 바꾸는 것
